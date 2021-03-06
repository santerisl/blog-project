package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for blog post.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class BlogPostController {

    /**
     * Blog post repository.
     */
    @Autowired
    private BlogPostRepository blogPostRepository;

    /**
     * Gets all blog posts by newest first. Containing every attribute.
     * @return all the blog posts.
     */
    @GetMapping(value = "/posts/all/detailed")
    public Iterable<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAllByOrderByDateDesc();
    }

    /**
     * Gets all blog posts by newest first. Without comments and content.
     * @return all the blog posts, without comments.
     */
    @GetMapping(value = "/posts/all")
    public Iterable<BlogPostProjectionBasic> getAllBlogPostsProjection() {
        return blogPostRepository.findAllByOrderByDateDescId();
    }

    /**
     * Gets set amount of blog posts from given page.
     * @param page Page number.
     * @return blog posts from given page.
     */
    @GetMapping(value = "/posts/")
    @ResponseBody
    public Map<String, Object> getBlogPostsByPage(@RequestParam(defaultValue = "0") int page) {
        Page<BlogPostProjectionBasic> blogPage = blogPostRepository.findAllByOrderByDateDesc(PageRequest.of(page,10));
        Map<String,Object> map = new HashMap<>();
        map.put("posts", blogPage.get());
        map.put("page", blogPage.getNumber()+1);
        map.put("pages", blogPage.getTotalPages());
        
        return map;
    }

    /**
     * Gets blog posts by given search word.
     * @param title Blog post title to search.
     * @return blog posts containing given search word in their title.
     */
    @GetMapping(value = "/search/")
    public Iterable<BlogPostProjectionBasic> getAllBlogPostsSearch(@RequestParam(defaultValue = "") String title) {
        return blogPostRepository.findByTitleContainingIgnoreCase(title);
    }

    /**
     * Gets only a blog post by ID.
     * @param blogId ID of the blog post.
     * @return blog post.
     */
    @GetMapping(value = "/posts/single/{blogId}")
    public BlogPost getBlogPostSingle(@PathVariable long blogId) {
        try {
            return blogPostRepository.findById(blogId).get();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }

    /**
     * Gets blog post by ID, with information about next and previous blog post.
     * @param blogId ID of the blog post.
     * @return map containing blog post with previous and next blog post titles.
     */
    @GetMapping(value = "/posts/{blogId}")
    public Map<String, Object> getBlogPost(@PathVariable long blogId) {
        try {
            Map<String,Object> map = new HashMap<>();
            BlogPost post = blogPostRepository.findById(blogId).get();
            map.put("post", post);
            map.put("prev", blogPostRepository.findFirstByIdBeforeOrderByDateDesc(blogId));
            map.put("next", blogPostRepository.findFirstByIdAfterOrderByDateAsc(blogId));
            return map;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }

    /**
     * Adds blog post to the repository.
     * @param post Blog post.
     * @param b Uri component builder.
     * @return HTTP status.
     */
    @PostMapping(value = "/posts/")
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost post, UriComponentsBuilder b) {
        blogPostRepository.save(post);

        UriComponents components = b.path("/posts/{blogId}").buildAndExpand(post.getId());

        return ResponseEntity.status(HttpStatus.CREATED).location(components.toUri()).build();
    }

    /**
     * Modifies the blog post.
     * @param requestPost Blog post.
     * @param blogId ID of the blog post.
     */
    @PutMapping(value = "/posts/{blogId}")
    public void updateBlogPost(@RequestBody BlogPost requestPost, @PathVariable long blogId) {
        try {
            BlogPost blogPost = blogPostRepository.findById(blogId).get();
            blogPost.setTitle(requestPost.getTitle());
            blogPost.setBrief(requestPost.getBrief());
            blogPost.setContent(requestPost.getContent());
            blogPost.setModifiedDate(LocalDateTime.now());
            blogPostRepository.save(blogPost);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }

    /**
     * Deletes the blog post.
     * @param blogId ID of the blog post.
     * @return HTTP status.
     */
    @DeleteMapping(value = "/posts/{blogId}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogId) {
        try {
            blogPostRepository.deleteById(blogId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }

    /**
     * Adds one like to a blog post.
     * @param blogId ID of the blog post.
     */
    @PutMapping(value = "/posts/{blogId}/like")
    public void addLike(@PathVariable long blogId) {
        try {
            BlogPost blogPost = blogPostRepository.findById(blogId).get();
            blogPost.setLikes(blogPost.getLikes() + 1);
            blogPostRepository.save(blogPost);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }
}
