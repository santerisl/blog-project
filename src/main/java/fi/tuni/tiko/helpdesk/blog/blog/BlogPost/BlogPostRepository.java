package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

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
public interface BlogPostRepository extends PagingAndSortingRepository<BlogPost, Long> {

    /**
     * @return List of all blog posts by newest first.
     */
    List<BlogPost> findAllByOrderByDateDesc();

    /**
     * @return List of all blog posts by newest first, without comments.
     */
    List<BlogPostProjectionBasic> findAllByOrderByDateDescId();

    /**
     * @return Page of blog posts by newest first.
     */
    List<BlogPostProjectionBasic> findAllByOrderByDateDesc(Pageable pageable);

    /**
     * @return Previous blog post ID and tittle.
     */
    BlogPostProjectionId findFirstByIdBefore(long blogPostId);

    /**
     * @return Next blog post ID and tittle.
     */
    BlogPostProjectionId findFirstByIdAfter(long blogPostId);

}
