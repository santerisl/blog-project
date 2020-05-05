package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    List<Comment> findAll();

    List<Comment> findByBlogPostId(long blogPostId);

}
