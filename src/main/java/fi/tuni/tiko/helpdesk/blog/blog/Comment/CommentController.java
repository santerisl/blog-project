package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPost;
import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPostGenerator;
import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPostRepository;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Controller for comment.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
@RestController
@RequestMapping(value = "/api")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @GetMapping(value = "/comments/")
    public Iterable<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @GetMapping(value = "/comments/{postId}")
    public Iterable<Comment> getCommentsByBlogPostId(@PathVariable long postId) {
        try {
            long blogPostId = blogPostRepository.findById(postId).get().getId();
            return commentRepository.findByBlogPostId(blogPostId);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No comments in post with id: " + postId + ".", ex);
        }
    }

    @PostMapping(value = "/comments/add/{blogPostId}")
    public ResponseEntity<Void> addComment(@RequestBody Comment comment, @PathVariable long blogPostId, UriComponentsBuilder b) {

        BlogPost blogPost = blogPostRepository.findById(blogPostId).get();
        comment.setBlogPost(blogPost);
        commentRepository.save(comment);

        blogPost.updateCommentCount();
        blogPostRepository.save(blogPost);

        UriComponents components = b.path("/comments/{commentId}").buildAndExpand(comment.getId());

        return ResponseEntity.status(HttpStatus.CREATED).location(components.toUri()).build();
    }

    @DeleteMapping(value = "/{blogPostId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable long blogPostId, @PathVariable long commentId) {
        try {
            BlogPost blogPost = blogPostRepository.findById(blogPostId).get();

            commentRepository.deleteById(commentId);
            blogPost.updateCommentCount();
            blogPostRepository.save(blogPost);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No comment with id: " + commentId + ".", ex);
        }
    }
}
