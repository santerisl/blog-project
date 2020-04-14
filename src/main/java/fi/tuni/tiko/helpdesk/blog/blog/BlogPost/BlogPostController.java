package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;

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
    
    @PostMapping(value = "/posts/")
    public void addBlogPost(@RequestBody BlogPost post) {
        blogPostRepository.save(post);
    }

    @PutMapping(value = "/posts/{blogId}")
    public void updateBlogPost(@RequestBody BlogPost requestPost, @PathVariable long blogId) {
        try {
            BlogPost blogPost = blogPostRepository.findById(blogId).get();
            blogPost.setTitle(requestPost.getTitle());
            blogPost.setBrief(requestPost.getBrief());
            blogPost.setContent(requestPost.getContent());
            blogPostRepository.save(blogPost);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }

    @DeleteMapping(value = "/posts/{blogId}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogId) {
        try {
            blogPostRepository.deleteById(blogId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }
}
