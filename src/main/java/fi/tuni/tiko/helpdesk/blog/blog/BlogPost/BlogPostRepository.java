package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogPostRepository extends CrudRepository<BlogPost, Long> {

    List<BlogPost> findAll();

}
