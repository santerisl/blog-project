package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;

@CrossOrigin
@RestController
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @PostConstruct
    public void initialize() {
        for(int i = 0; i < 10; i++) {
            blogPostRepository.save(BlogPostGenerator.create());
        }
    }
    
    @PostMapping(value = "/api/posts/")
    public void addBlogPost(@RequestBody BlogPost post) {
        blogPostRepository.save(post);
    }

    @GetMapping(value = "/api/posts/")
    public Iterable<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    @GetMapping(value = "/api/posts/{blogId}")
    public BlogPost getBlogPost(@PathVariable long blogId) {
        try {
            return blogPostRepository.findById(blogId).get();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No blog post with id: " + blogId + ".", ex);
        }
    }
}
