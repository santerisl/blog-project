package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogPost")
public class BlogPost {

    @Id
    @GeneratedValue
    private long id;

    private String author;

    private String title;

    private String brief;

    @Lob
    private String content;

    private int likes;

    private LocalDateTime date = LocalDateTime.now();

    private LocalDateTime modifiedDate;

    public BlogPost() {}

    public BlogPost(String author, String title, String brief, String content, int likes) {
        this.author = author;
        this.title = title;
        this.brief = brief;
        this.content = content;
        this.likes = likes;
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

    public LocalDateTime getDate() {
        return date;
    }


    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}
