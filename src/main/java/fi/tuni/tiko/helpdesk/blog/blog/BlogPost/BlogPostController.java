package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import javax.annotation.PostConstruct;

@RestController
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @PostConstruct
    public void initialize() {
        for(int i = 0; i < 10; i++) {
            BlogPost p = new BlogPost("Author", "Title " + i, "Content", 1,
                    LocalDateTime.now(), null);
                blogPostRepository.save(p);
        }
    }
    
    @PostMapping(value = "/api/posts")
    public void addBlogPost(@RequestBody BlogPost post) {
        blogPostRepository.save(post);
    }

    @GetMapping(value = "/api/posts/")
    public Iterable<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }
}
