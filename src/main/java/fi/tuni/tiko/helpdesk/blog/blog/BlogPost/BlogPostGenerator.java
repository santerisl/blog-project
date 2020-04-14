package fi.tuni.tiko.helpdesk.blog.blog.BlogPost;

import java.time.LocalDateTime;

public class BlogPostGenerator {
    private static String[] words = {
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
        "elit", "nunc", "in", "lobortis", "mauris", "pellentesque", "fringilla",
        "mi", "sed", "mi", "sagittis", "sit", "amet", "lacinia", "ligula",
        "finibus", "fusce", "consectetur", "feugiat", "mauris", "a", "dictum",
        "duis", "eu", "vestibulum", "purus", "praesent", "ut"
    };

    private static String[] paragraphs = {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in lobortis mauris. Pellentesque fringilla mi sed mi sagittis, sit amet lacinia ligula finibus. Fusce consectetur feugiat mauris a dictum. Duis eu vestibulum purus. Praesent ut sapien tellus. Nulla finibus quis turpis nec porttitor. Sed semper enim sit amet justo sollicitudin iaculis sed sit amet sem. Fusce quis aliquet velit, sed lobortis tortor.",
        "Nulla at iaculis metus. Nulla tincidunt elementum sodales. Praesent pharetra tempor erat, a suscipit risus sagittis sit amet. Suspendisse potenti. Nullam facilisis felis vitae augue ultrices, eu commodo diam laoreet. Nullam ornare maximus sodales. Nam ut diam eget justo ullamcorper sagittis. Mauris in dolor eget nunc vulputate dignissim eget sed quam. Praesent velit diam, aliquam at nunc nec, porttitor porttitor tellus. Aliquam vitae erat ac nulla consequat venenatis. Vivamus malesuada efficitur purus, a efficitur purus sagittis eget. Nam dignissim tortor quis nisi imperdiet varius. Integer volutpat quam orci, eu eleifend felis imperdiet sed. Suspendisse et porttitor lacus. Nam felis est, malesuada in porttitor a, cursus eget lectus.",
        "Donec libero turpis, imperdiet sed placerat vitae, interdum vel urna. Aliquam erat volutpat. Nunc suscipit nibh quis nisi finibus, at laoreet sem blandit. Donec in nunc nunc. Proin nisl tellus, elementum vitae malesuada eget, finibus nec augue. Nam ante dui, scelerisque eget leo vitae, blandit vehicula ipsum. Quisque lacinia accumsan lectus, in ullamcorper leo tempus et. Praesent metus velit, consequat eget diam sed, elementum ornare nibh.",
        "Nulla ac varius ex, nec posuere odio. Phasellus in sem vitae ipsum bibendum imperdiet eget in ante. Etiam ut scelerisque tellus. Proin varius suscipit tortor, eu aliquet mi. Praesent eget nibh maximus, varius purus pellentesque, ornare eros. Morbi eget elit vitae orci scelerisque scelerisque. Nulla ac convallis tellus. Etiam at molestie quam, quis vulputate est. Donec erat justo, pretium in diam vel, convallis accumsan lectus. Donec et diam rhoncus, mattis dolor sit amet, tempor justo. Integer et tincidunt purus. Aliquam commodo turpis ac mollis venenatis.",
        "Pellentesque blandit metus ipsum, quis molestie eros sagittis sit amet. Nunc molestie velit quis velit commodo pretium vel a risus. Cras pellentesque imperdiet ipsum, sit amet dapibus metus auctor tristique. Morbi laoreet nibh sed justo porta maximus. Nam ac tincidunt eros, vel commodo eros. Aenean ac odio mauris. Nam rutrum consequat orci, in tempor tellus dignissim at. Suspendisse ut justo a ante volutpat fermentum nec non velit."
    };

    private static String[] firstnames = {
        "Antti", "Emma", "Jami", "Anni", "Joona", "Anna", "Aleksi", "Venla", "Samu", "Veera", "Jaakko", "Sara", "Aaro", "Julia", "arttu", "Aino", "Juho", "Iida", "Miika", "Sofia", "Leevi", "Elina", "Juuso"
    };

    private static String[] lastnames = {
        "Korhonen", "Virtanen", "Ruoho", "Lehtonen", "Halla", "Kanerva", "Mäkinen", "Nieminen", "Järvinen", "Heikkinen", "Koskinen", "Seppälä", "Hämäläinen", "Kivi", "Laaksonen", "Jokinen", "Ranta", "Nurmi", "Peura", "Aalto", "Vanhanen"
    };

    private static String createAuthor() {
        String name = firstnames[(int)(Math.random() * firstnames.length)];
        name += " ";
        name += lastnames[(int)(Math.random() * lastnames.length)];
        return name;
    }

    private static String createTitle(int min, int max) {
        int wCount = (int) (Math.random() * max) + min;
        String title = "";
        while(wCount >= 0) {
            title += words[(int)(Math.random() * words.length)];
            title += " ";
            wCount--;
        }
        return title.substring(0, 1).toUpperCase() + title.substring(1);
    }

    private static String createContent() {
        int pCount = (int) (Math.random() * 6) + 2;
        String content = "";
        while(pCount >= 0) {
            content += paragraphs[(int)(Math.random() * paragraphs.length)];
            content += "\n\n";
            pCount--;
        }
        return content;
    }

    public static BlogPost create() {
        return new BlogPost(
            createAuthor(),
            createTitle(4, 10),
            createTitle(12, 22),
            createContent(),
            (int)(Math.random() * 100)
        );
    }
}
