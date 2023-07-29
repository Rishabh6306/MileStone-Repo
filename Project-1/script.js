const formContainer = document.getElementById('form-container');
formContainer.style.display = 'none';
const gridContainer = document.getElementById('grid-container');
const blogDetails = document.getElementById('blog-details');
const detailsTitle = document.getElementById('details-title');
const detailsDescription = document.getElementById('details-description');
const detailsText = document.getElementById('details-text');
const detailsImage = document.getElementById('details-image'); // Added the image element

const addBtn = document.getElementById('add-btn');

// Retrieve blogs data from localStorage on page load
const savedBlogs = localStorage.getItem('blogs');
const blogs = savedBlogs ? JSON.parse(savedBlogs) : [];

function createBlogElement(blogData) {
    const blogContainer = document.createElement('div');
    blogContainer.classList.add('grid');

    const image = document.createElement('img');
    image.src = blogData.imageUrl;
    image.alt = 'Blog Image';
    blogContainer.appendChild(image);

    const title = document.createElement('h1');
    title.innerText = blogData.title;
    blogContainer.appendChild(title);

    const description = document.createElement('span');
    description.innerText = blogData.description;
    blogContainer.appendChild(description);

    const text = document.createElement('p');
    text.innerText = blogData.text;
    text.style.display = 'none'; // Initially hide the text content in the grid
    blogContainer.appendChild(text);

    const readButton = document.createElement('button');
    readButton.innerText = 'Read';
    blogContainer.appendChild(readButton);

    readButton.addEventListener('click', function () {
        // Update the blog details overlay when the "Read" button is clicked
        detailsImage.src = blogData.imageUrl;
        detailsTitle.innerText = blogData.title;
        detailsDescription.innerText = blogData.description;
        detailsText.innerText = blogData.text;

        // Show the text content in the overlay when the "Read" button is clicked
        text.style.display = 'block';

        blogDetails.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Remove the 'active-blog' class from all blogs
        const activeBlog = gridContainer.querySelector('.active-blog');
        if (activeBlog) {
            activeBlog.classList.remove('active-blog');
            const activeBlogText = activeBlog.querySelector('p');
            if (activeBlogText) {
                activeBlogText.style.display = 'none';
            }
        }

        // Mark this blog as the active one
        blogContainer.classList.add('active-blog');
    });

    return blogContainer;
}

function hideBlogDetails() {
    blogDetails.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore the scrolling behavior

    // Hide the text content in the grid after closing the overlay
    const activeBlog = gridContainer.querySelector('.active-blog');
    if (activeBlog) {
        const text = activeBlog.querySelector('p');
        if (text) {
            text.style.display = 'none';
        }
    }
}

function toggleFormVisibility(showFormAlways) {
    if (showFormAlways || gridContainer.getElementsByClassName('grid').length === 0) {
        // Show the form when there are no blogs or showFormAlways is true
        formContainer.innerHTML = `
          <span id="cut-icon-form">✂</span>
          <form>
            <input type="text" placeholder="Enter Blog Post URL">
            <input type="text" placeholder="Enter Blog Title">
            <input type="text" placeholder="Enter Blog Description">
            <textarea placeholder="Write Here" name="blog-text" cols="30" rows="10"></textarea>
            <button type="submit" id="blog-btn">Add Blog</button>
          </form>
        `;
        formContainer.style.display = 'block';
        addBtn.style.display = 'none';

        const cutIconForm = formContainer.querySelector('#cut-icon-form');
        cutIconForm.addEventListener('click', function () {
            formContainer.style.display = 'none';
            addBtn.style.display = 'block';
        });

        const blogForm = formContainer.querySelector('form');
        blogForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const imageUrl = blogForm.querySelector('input[placeholder="Enter Blog Post URL"]').value;
            const title = blogForm.querySelector('input[placeholder="Enter Blog Title"]').value;
            const description = blogForm.querySelector('input[placeholder="Enter Blog Description"]').value;
            const text = blogForm.querySelector('textarea[name="blog-text"]').value;

            const newBlog = {
                imageUrl: imageUrl,
                title: title,
                description: description,
                text: text
            };

            blogs.push(newBlog);

            // Save the updated blogs array to localStorage
            localStorage.setItem('blogs', JSON.stringify(blogs));

            const blogElement = createBlogElement(newBlog);
            gridContainer.appendChild(blogElement);

            formContainer.innerHTML = '';
            formContainer.style.display = 'none';
            addBtn.style.display = 'block';
        });
    } else {
        formContainer.style.display = 'none';
        addBtn.style.display = 'block';
    }
}

addBtn.addEventListener('click', function () {
    toggleFormVisibility(true);
});

const cutIconDetails = document.getElementById('cut-icon');
cutIconDetails.addEventListener('click', function () {
    hideBlogDetails();
});

// Function to load blogs from localStorage
function loadBlogsFromLocalStorage() {
    for (const blogData of blogs) {
        const blogElement = createBlogElement(blogData);
        gridContainer.appendChild(blogElement);
    }

    // After loading blogs, check if there are any blogs to decide whether to show the form.
    toggleFormVisibility(false); 
}

// Check if form should be shown based on grids when the page loads
toggleFormVisibility(false); 

// Load blogs from localStorage on page load
loadBlogsFromLocalStorage();