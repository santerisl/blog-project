package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import java.time.LocalDateTime;

public interface BlogPostProjection {

    String getAuthor();

    String getTitle();

    String getBrief();

    LocalDateTime getDate();

    LocalDateTime getModifiedDate();

    int getLikes();

    int getCommentCount();
}
