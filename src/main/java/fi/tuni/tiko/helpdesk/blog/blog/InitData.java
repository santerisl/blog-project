package fi.tuni.tiko.helpdesk.blog.blog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPost;
import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPostGenerator;
import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPostRepository;
import fi.tuni.tiko.helpdesk.blog.blog.Comment.CommentRepository;

@Component
public class InitData implements ApplicationListener<ContextRefreshedEvent>{
    
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        for(int i = 0; i < 50; i++) {
            blogPostRepository.save(BlogPostGenerator.create(50 - i));
        }

        List<BlogPost> posts = blogPostRepository.findAllByOrderByDateDesc();
        for (BlogPost post : posts) {
            for (int i = 0; i < post.getCommentCount(); i++) {
                commentRepository.save(BlogPostGenerator.createComment(post, i));
            }
        }
    }
}
