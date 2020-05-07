package fi.tuni.tiko.helpdesk.blog.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);

		System.out.println("Team members: Pohjalainen Elias, Saraluhta Santeri");
		System.out.println("---Curl commands for testing---");
		System.out.println("Fetch all blog posts:");
		System.out.println("curl -X \"GET\" localhost:8080/api/posts");
		System.out.println("Fetch post by blog post ID:");
		System.out.println("curl -X \"GET\" localhost:8080/api/posts/1");
		System.out.println("Post new blog post:");
		System.out.println("curl -d \"author=Pekka Puu&title=Blog post title&brief=Short brief of blog post" +
				"&content=Content of blog post. Much text here.\" localhost:8080/api/posts");
		System.out.println("Delete post by blog post ID:");
		System.out.println("curl -X \"DELETE\" localhost:8080/api/posts/1");
		System.out.println("Post new comment:");
		System.out.println("curl -d \"author=Ossi Osteri&content=Short comment.\" localhost:8080/api/comments/add/11");
		System.out.println("User:admin / Password:admin");
	}
}
