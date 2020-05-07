package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPost;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Comment. Main component of the application. Stores likes and comments.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
@Entity
public class Comment {

    /**
     * Id of the comment.
     */
    @Id
    @GeneratedValue
    private long id;

    /**
     * Blog post where the comment belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blogPost_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BlogPost blogPost;

    /**
     * Author of the comment.
     */
    private String author;

    /**
     * Content of the comment.
     */
    @Lob
    private String content;

    /**
     * Creation date and time of the comment.
     */
    private LocalDateTime date = LocalDateTime.now();

    //Constructors

    public Comment() {
    }

    public Comment(String author, String content) {
        this.author = author;
        this.content = content;
    }

    //Getters and setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setBlogPost(BlogPost blogPost) {
        this.blogPost = blogPost;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
