package fi.tuni.tiko.helpdesk.blog.blog.Comment;

import fi.tuni.tiko.helpdesk.blog.blog.BlogPost.BlogPost;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blogPost_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BlogPost blogPost;

    private String author;

    @Lob
    private String content;

    private LocalDateTime date = LocalDateTime.now();

    public Comment() {
    }

    public Comment(String author, String content) {
        this.author = author;
        this.content = content;
    }

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
