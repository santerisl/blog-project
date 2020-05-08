package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Repository for blog posts.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
public interface BlogPostRepository extends CrudRepository<BlogPost, Long> {

    /**
     * @return List of all blog posts by newest first.
     */
    List<BlogPost> findAllByOrderByDateDesc();

    /**
     * @return List of all blog posts by newest first, without comments.
     */
    List<BlogPostProjectionBasic> findAllByOrderByDateDescId();

    BlogPostProjectionId findFirstByIdBefore(long blogPostId);

    BlogPostProjectionId findFirstByIdAfter(long blogPostId);

}
