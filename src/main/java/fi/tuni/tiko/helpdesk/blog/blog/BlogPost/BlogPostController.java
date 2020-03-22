package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @PostMapping(value = "/blog/add")
    public void addBlogPost(@RequestBody BlogPost post) {
        blogPostRepository.save(post);
    }

    @GetMapping(value = "/blog/all")
    public Iterable<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }
}
