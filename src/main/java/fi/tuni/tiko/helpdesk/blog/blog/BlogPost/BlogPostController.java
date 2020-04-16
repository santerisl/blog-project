package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @PostConstruct
    public void initialize() {
        for(int i = 0; i < 10; i++) {
            blogPostRepository.save(BlogPostGenerator.create());
        }
    }

    @GetMapping(value = "/posts/")
    public Iterable<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAllByOrderByDateDesc();
    }

    @GetMapping(value = "/posts/{blogId}")
    public BlogPost getBlogPost(@PathVariable long blogId) {
        try {
            return blogPostRepository.findById(blogId).get();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }

    @Secured("ROLE_ADMIN")
    @PostMapping(value = "/posts/")
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost post, UriComponentsBuilder b) {
        blogPostRepository.save(post);

        UriComponents components = b.path("/posts/{blogId}").buildAndExpand(post.getId());

        return ResponseEntity.status(HttpStatus.CREATED).location(components.toUri()).build();
    }

    @Secured("ROLE_ADMIN")
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

    @Secured("ROLE_ADMIN")
    @DeleteMapping(value = "/posts/{blogId}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogId) {
        try {
            blogPostRepository.deleteById(blogId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }
}
