package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import fi.tuni.tiko.helpdesk.blog.blog.Comment.Comment;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Blog post. Main component of the application. Stores likes and comments.
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
@Table(name = "blogPost")
public class BlogPost {

    /**
     * Id of the blog post.
     */
    @Id
    @GeneratedValue
    private long id;

    /**
     * Author of the blog post.
     */
    private String author;

    /**
     * Title of the blog post.
     */
    private String title;

    /**
     * A short brief for the blog post. Summarizes the content.
     */
    private String brief;

    /**
     * Main content of the blog post.
     */
    @Lob
    private String content;

    /**
     * Creation time of the blog post.
     */
    private LocalDateTime date = LocalDateTime.now();

    /**
     * Edit date of the blog post.
     */
    private LocalDateTime modifiedDate;

    /**
     * Amount of likes of the blog post.
     */
    private int likes;

    /**
     * Amount of comments of the blog post.
     */
    private int commentCount;

    /**
     * Comments of the blog post.
     */
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    //Constructors

    public BlogPost() {}

    public BlogPost(String author, String title, String brief, String content, int likes) {
        this.author = author;
        this.title = title;
        this.brief = brief;
        this.content = content;
        this.likes = likes;
    }

    /**
     * Updates the count of comments.
     */
    public void updateCommentCount() {
        setCommentCount(comments.size());
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }
}
