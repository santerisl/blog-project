package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPost;
import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

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

//    @GetMapping(value = "/comments/{commentId}")
//    public Comment getComment(@PathVariable long commentId) {
//        try {
//            return commentRepository.findById(commentId).get();
//        } catch (Exception ex) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No comment with id: " + commentId + ".", ex);
//        }
//    }

    @GetMapping(value = "/comments/{author}")
    public Iterable<Comment> getCommentsByAuthor(@PathVariable String author) {
        try {
            return commentRepository.findByAuthor(author);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No comments with author: " + author + ".", ex);
        }
    }

//    @GetMapping(value = "/comments/{commentId}")
//    public Iterable<Comment> getCommentsByPost(@PathVariable long postId) {
//        try {
//            BlogPost blogPost = blogPostRepository.findById(postId).get();
//            return commentRepository.findCommentsByBlogPost(blogPost);
//        } catch (Exception ex) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No comments in post with id: " + postId + ".", ex);
//        }
//    }

    @PostMapping(value = "/comments/")
    public ResponseEntity<Void> addComment(@RequestBody Comment comment, UriComponentsBuilder b) {
        commentRepository.save(comment);

        UriComponents components = b.path("/comments/{commentId}").buildAndExpand(comment.getId());

        return ResponseEntity.status(HttpStatus.CREATED).location(components.toUri()).build();
    }

    @DeleteMapping(value = "/posts/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable long commentId) {
        try {
            commentRepository.deleteById(commentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No comment with id: " + commentId + ".", ex);
        }
    }
}
