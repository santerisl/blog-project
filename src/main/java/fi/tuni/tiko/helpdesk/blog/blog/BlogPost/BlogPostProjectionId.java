package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

/**
 * Projection for blog post. Sends only the needed data for the frontend.
 * <p>
 *     Web App Development and Project, 4A00CN42-3004, Spring 2020
 * </p>
 * @author Elias Pohjalainen,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @author Santeri Saraluhta,
 * Business Information Systems, Tampere University of Applied Sciences.
 * @version 1.0
 */
public interface BlogPostProjectionId {

    long getId();

    String getTitle();

}
