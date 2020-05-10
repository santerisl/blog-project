package fi.tuni.tiko.helpdesk.blog.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class of the application.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
@SpringBootApplication
public class BlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);

		System.out.println("-----I N F O-----");
		System.out.println("--Team members: Pohjalainen Elias, Saraluhta Santeri");
		System.out.println("--Curl commands for testing:");
		System.out.println("-Fetch all blog posts:");
		System.out.println("curl -X GET localhost:8080/api/posts/all");
		System.out.println("-Fetch blog posts from given page:");
		System.out.println("curl -X GET localhost:8080/api/posts/?page=1");
		System.out.println("-Fetch post by blog post ID:");
		System.out.println("curl -X GET localhost:8080/api/posts/1");
		System.out.println("-Post new blog post:");
		System.out.println("curl -X POST -H \"Content-type: application/json\" localhost:8080/api/posts/ -d " +
				"\"{\\\"author\\\":\\\"Pekka Puu\\\", \\\"title\\\":\\\"Blog post title\\\", \\\"brief\\\":\\\"Short " +
				"brief of blog post\\\", \\\"content\\\":\\\"Content of blog post. Much text here.\\\"}\"");
		System.out.println("-Delete post by blog post ID:");
		System.out.println("curl -X DELETE localhost:8080/api/posts/1");
		System.out.println("-Post new comment:");
		System.out.println("curl -X POST -H \"Content-type: application/json\" localhost:8080/api/comments/add/11 -d " +
				"\"{\\\"author\\\":\\\"Osteri Ossi\\\", \\\"content\\\":\\\"Content of blog post. Much text here.\\\"}\"");
		System.out.println("-Add like:");
		System.out.println("curl -X PUT localhost:8080/api/posts/1/like");
		System.out.println("--User:admin / Password:admin");
	}
}
