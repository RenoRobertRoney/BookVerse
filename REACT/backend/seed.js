const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

const books = [
    // Fiction - Fantasy
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 699,
        description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
        image: "https://covers.openlibrary.org/b/id/10522067-L.jpg",
        rating: 4.9
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        price: 550,
        description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, until he is swept away on an adventure by the wizard Gandalf and thirteen dwarves.",
        image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        rating: 4.8
    },
    {
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        category: "Fantasy",
        price: 899,
        description: "Follow the journey of Kvothe, a young man who grows up to be the most notorious wizard the world has ever seen.",
        image: "https://covers.openlibrary.org/b/id/8259443-L.jpg",
        rating: 4.7
    },

    // Fiction - Romance
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        price: 299,
        description: "A classic novel of manners, following the turbulent relationship between Elizabeth Bennet and the wealthy Fitzwilliam Darcy.",
        image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        rating: 4.6
    },
    {
        title: "The Notebook",
        author: "Nicholas Sparks",
        category: "Romance",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8259286-L.jpg",
        rating: 4.3
    },
    {
        title: "Me Before You",
        author: "Jojo Moyes",
        category: "Romance",
        price: 450,
        image: "https://covers.openlibrary.org/b/id/10586961-L.jpg",
        rating: 4.5
    },

    // Fiction - Sci-Fi
    {
        title: "Dune",
        author: "Frank Herbert",
        category: "Sci-Fi",
        price: 799,
        image: "https://covers.openlibrary.org/b/id/8885023-L.jpg",
        rating: 4.8
    },
    {
        title: "Ender's Game",
        author: "Orson Scott Card",
        category: "Sci-Fi",
        price: 499,
        image: "https://covers.openlibrary.org/b/id/7905186-L.jpg",
        rating: 4.6
    },
    {
        title: "Project Hail Mary",
        author: "Andy Weir",
        category: "Sci-Fi",
        price: 650,
        image: "https://covers.openlibrary.org/b/id/10633816-L.jpg",
        rating: 4.9
    },

    // Fiction - Mystery
    {
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        category: "Mystery",
        price: 599,
        image: "https://covers.openlibrary.org/b/id/8259432-L.jpg",
        rating: 4.5
    },
    {
        title: "Gone Girl",
        author: "Gillian Flynn",
        category: "Mystery",
        price: 499,
        image: "https://covers.openlibrary.org/b/id/8259278-L.jpg",
        rating: 4.4
    },
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "Mystery",
        price: 550,
        image: "https://covers.openlibrary.org/b/id/10594303-L.jpg",
        rating: 4.6
    },

    // Fiction - Horror
    {
        title: "It",
        author: "Stephen King",
        category: "Horror",
        price: 899,
        image: "https://covers.openlibrary.org/b/id/8259746-L.jpg",
        rating: 4.5
    },
    {
        title: "Dracula",
        author: "Bram Stoker",
        category: "Horror",
        price: 350,
        image: "https://covers.openlibrary.org/b/id/7222166-L.jpg",
        rating: 4.4
    },
    {
        title: "The Shining",
        author: "Stephen King",
        category: "Horror",
        price: 699,
        image: "https://covers.openlibrary.org/b/id/8259972-L.jpg",
        rating: 4.7
    },

    // Fiction - Literary
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Literary",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
        rating: 4.8
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Literary",
        price: 499,
        image: "https://covers.openlibrary.org/b/id/7222161-L.jpg",
        rating: 4.5
    },
    {
        title: "Beloved",
        author: "Toni Morrison",
        category: "Literary",
        price: 450,
        image: "https://covers.openlibrary.org/b/id/8259500-L.jpg",
        rating: 4.6
    },

    // Non-Fiction - Biography
    {
        title: "Steve Jobs",
        author: "Walter Isaacson",
        category: "Biography",
        price: 899,
        image: "https://covers.openlibrary.org/b/id/7266946-L.jpg",
        rating: 4.7
    },
    {
        title: "Becoming",
        author: "Michelle Obama",
        category: "Biography",
        price: 799,
        image: "https://covers.openlibrary.org/b/id/8376999-L.jpg",
        rating: 4.8
    },
    {
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        category: "Biography",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8259779-L.jpg",
        rating: 4.7
    },

    // Non-Fiction - History
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "History",
        price: 699,
        image: "https://covers.openlibrary.org/b/id/8259687-L.jpg",
        rating: 4.8
    },
    {
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        category: "History",
        price: 599,
        image: "https://covers.openlibrary.org/b/id/8259518-L.jpg",
        rating: 4.5
    },
    {
        title: "The Silk Roads",
        author: "Peter Frankopan",
        category: "History",
        price: 750,
        image: "https://covers.openlibrary.org/b/id/8098367-L.jpg",
        rating: 4.6
    },

    // Non-Fiction - Self-Help
    {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        price: 599,
        image: "https://covers.openlibrary.org/b/id/10536483-L.jpg",
        rating: 4.9
    },
    {
        title: "The Power of Now",
        author: "Eckhart Tolle",
        category: "Self-Help",
        price: 499,
        image: "https://covers.openlibrary.org/b/id/8259298-L.jpg",
        rating: 4.6
    },
    {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "Self-Help",
        price: 650,
        image: "https://covers.openlibrary.org/b/id/7222262-L.jpg",
        rating: 4.5
    },

    // Non-Fiction - Science
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        price: 499,
        image: "https://covers.openlibrary.org/b/id/8260113-L.jpg",
        rating: 4.7
    },
    {
        title: "Cosmos",
        author: "Carl Sagan",
        category: "Science",
        price: 699,
        image: "https://covers.openlibrary.org/b/id/8259517-L.jpg",
        rating: 4.9
    },
    {
        title: "The Gene: An Intimate History",
        author: "Siddhartha Mukherjee",
        category: "Science",
        price: 750,
        image: "https://covers.openlibrary.org/b/id/8259960-L.jpg",
        rating: 4.8
    },

    // Non-Fiction - Cooking
    {
        title: "Salt, Fat, Acid, Heat",
        author: "Samin Nosrat",
        category: "Cooking",
        price: 999,
        image: "https://covers.openlibrary.org/b/id/10915655-L.jpg",
        rating: 4.9
    },
    {
        title: "The Joy of Cooking",
        author: "Irma S. Rombauer",
        category: "Cooking",
        price: 899,
        image: "https://covers.openlibrary.org/b/id/12547146-L.jpg",
        rating: 4.6
    },
    {
        title: "Plenty",
        author: "Yotam Ottolenghi",
        category: "Cooking",
        price: 850,
        image: "https://covers.openlibrary.org/b/id/8259747-L.jpg",
        rating: 4.7
    },

    // Non-Fiction - Business
    {
        title: "Zero to One",
        author: "Peter Thiel",
        category: "Business",
        price: 550,
        image: "https://covers.openlibrary.org/b/id/8259757-L.jpg",
        rating: 4.6
    },
    {
        title: "Shoe Dog",
        author: "Phil Knight",
        category: "Business",
        price: 699,
        image: "https://covers.openlibrary.org/b/id/8259275-L.jpg",
        rating: 4.9
    },
    {
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        category: "Business",
        price: 450,
        image: "https://covers.openlibrary.org/b/id/8259522-L.jpg",
        rating: 4.5
    },

    // Special - Manga
    {
        title: "One Piece, Vol. 1",
        author: "Eiichiro Oda",
        category: "Manga",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8260197-L.jpg",
        rating: 4.9
    },
    {
        title: "Naruto, Vol. 1",
        author: "Masashi Kishimoto",
        category: "Manga",
        price: 350,
        image: "https://covers.openlibrary.org/b/id/8260192-L.jpg",
        rating: 4.8
    },
    {
        title: "Death Note, Vol. 1",
        author: "Tsugumi Ohba",
        category: "Manga",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8260195-L.jpg",
        rating: 4.8
    },

    // Special - Comics
    {
        title: "Watchmen",
        author: "Alan Moore",
        category: "Comics",
        price: 899,
        image: "https://covers.openlibrary.org/b/id/8259501-L.jpg",
        rating: 4.8
    },
    {
        title: "The Sandman, Vol. 1",
        author: "Neil Gaiman",
        category: "Comics",
        price: 950,
        image: "https://covers.openlibrary.org/b/id/8259688-L.jpg",
        rating: 4.7
    },
    {
        title: "Batman: The Killing Joke",
        author: "Alan Moore",
        category: "Comics",
        price: 499,
        image: "https://covers.openlibrary.org/b/id/8259505-L.jpg",
        rating: 4.6
    },

    // Special - Young Adult
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        category: "Young Adult",
        price: 450,
        image: "https://covers.openlibrary.org/b/id/8259296-L.jpg",
        rating: 4.7
    },
    {
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        category: "Young Adult",
        price: 599,
        image: "https://covers.openlibrary.org/b/id/10522069-L.jpg",
        rating: 4.9
    },
    {
        title: "The Fault in Our Stars",
        author: "John Green",
        category: "Young Adult",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8259424-L.jpg",
        rating: 4.5
    },

    // Special - Children
    {
        title: "The Very Hungry Caterpillar",
        author: "Eric Carle",
        category: "Children",
        price: 299,
        image: "https://covers.openlibrary.org/b/id/8259514-L.jpg",
        rating: 4.8
    },
    {
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        category: "Children",
        price: 350,
        image: "https://covers.openlibrary.org/b/id/8259515-L.jpg",
        rating: 4.7
    },
    {
        title: "Charlotte's Web",
        author: "E.B. White",
        category: "Children",
        price: 320,
        image: "https://covers.openlibrary.org/b/id/8259516-L.jpg",
        rating: 4.9
    },

    // Special - Arts
    {
        title: "The Story of Art",
        author: "E.H. Gombrich",
        category: "Arts",
        price: 1299,
        image: "https://covers.openlibrary.org/b/id/8259740-L.jpg",
        rating: 4.8
    },
    {
        title: "Ways of Seeing",
        author: "John Berger",
        category: "Arts",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8259741-L.jpg",
        rating: 4.6
    },
    {
        title: "Steal Like an Artist",
        author: "Austin Kleon",
        category: "Arts",
        price: 350,
        image: "https://covers.openlibrary.org/b/id/8259742-L.jpg",
        rating: 4.7
    },

    // Special - Technology
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        category: "Technology",
        price: 1199,
        image: "https://covers.openlibrary.org/b/id/8259276-L.jpg",
        rating: 4.8
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        price: 1099,
        image: "https://covers.openlibrary.org/b/id/8259277-L.jpg",
        rating: 4.7
    },
    {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Technology",
        price: 1599,
        image: "https://covers.openlibrary.org/b/id/8259279-L.jpg",
        rating: 4.6
    },

    // Special - Travel
    {
        title: "Into the Wild",
        author: "Jon Krakauer",
        category: "Travel",
        price: 450,
        image: "https://covers.openlibrary.org/b/id/8259288-L.jpg",
        rating: 4.7
    },
    {
        title: "On the Road",
        author: "Jack Kerouac",
        category: "Travel",
        price: 399,
        image: "https://covers.openlibrary.org/b/id/8259289-L.jpg",
        rating: 4.3
    },
    {
        title: "Eat, Pray, Love",
        author: "Elizabeth Gilbert",
        category: "Travel",
        price: 350,
        image: "https://covers.openlibrary.org/b/id/8259290-L.jpg",
        rating: 4.2
    },

    // Special - Philosophy
    {
        title: "Meditations",
        author: "Marcus Aurelius",
        category: "Philosophy",
        price: 299,
        image: "https://covers.openlibrary.org/b/id/8259291-L.jpg",
        rating: 4.8
    },
    {
        title: "Beyond Good and Evil",
        author: "Friedrich Nietzsche",
        category: "Philosophy",
        price: 350,
        image: "https://covers.openlibrary.org/b/id/8259292-L.jpg",
        rating: 4.6
    },
    {
        title: "The Republic",
        author: "Plato",
        category: "Philosophy",
        price: 320,
        image: "https://covers.openlibrary.org/b/id/8259293-L.jpg",
        rating: 4.7
    }
];

const booksWithDescriptions = books.map(book => ({
    ...book,
    description: book.description || `Dive into the world of ${book.title} by ${book.author}. A masterpiece in the ${book.category} genre that will keep you hooked from start to finish.`
}));

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await Book.deleteMany({});
        console.log("🗑️ Cleared existing books");

        await Book.insertMany(booksWithDescriptions);
        console.log("📚 Added " + books.length + " sample books");

        process.exit();
    } catch (err) {
        console.error("❌ Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
