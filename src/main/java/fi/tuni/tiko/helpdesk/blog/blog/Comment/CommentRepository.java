package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPost;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    List<Comment> findAll();

    List<Comment> findByAuthor(String author);

    //List<Comment> findCommentsByBlogPost(BlogPost blogPost);

}
