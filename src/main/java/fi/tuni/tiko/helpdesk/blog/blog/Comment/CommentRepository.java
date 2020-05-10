package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Repository for comments.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
public interface CommentRepository extends CrudRepository<Comment, Long> {

    /**
     * @return List of all comments.
     */
    List<Comment> findAll();

    /**
     * @param blogPostId Blog post ID.
     * @return List of comments from given blog post.
     */
    List<Comment> findByBlogPostId(long blogPostId);

}
