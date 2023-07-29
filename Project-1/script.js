// const formTemplate = `
//     <span id="cut-icon">✂</span>
//     <form>
//         <input type="text" placeholder="Enter Blog Post URL">
//         <input type="text" placeholder="Enter Blog Title">
//         <input type="text" placeholder="Enter Blog Description">
//         <textarea placeholder="Write Here" id="text" cols="30" rows="10"></textarea>
//         <button id="blog-btn">Add Blog</button>
//     </form>
// `;

// const formContainer = document.getElementById('form-container');
// formContainer.style.display = 'none';

// document.getElementById('add-btn').addEventListener('click', function() {
//     formContainer.innerHTML = formTemplate;
//     formContainer.style.display = 'block';
// });

// formContainer.addEventListener('click', function(event) {
//     if (event.target.id === 'cut-icon') {
//         formContainer.style.display = 'none';
//     } 
// });


// document.getElementById('read-btn').addEventListener('click', function() {
//     const blogDetails = document.getElementById('blog-details');
//     const title = document.getElementById('title').innerText;
//     const description = document.getElementById('description').innerText;
//     const text = document.getElementById('text').value;

//     document.getElementById('details-title').innerText = title;
//     document.getElementById('details-description').innerText = description;

//     // Update the details-text paragraph with the text content and show it
//     const detailsText = document.getElementById('details-text');
//     detailsText.innerText = text;
//     detailsText.style.display = 'block';

//     // Show blog details and hide other elements
//     blogDetails.style.display = 'block';
//     document.body.style.overflow = 'hidden';
// });

// // ... Remaining code ...


// document.getElementById('cut-icon').addEventListener('click', function() {
//     const blogDetails = document.getElementById('blog-details');
//     // Hide blog details and show other elements
//     blogDetails.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });





const formContainer = document.getElementById('form-container');
formContainer.style.display = 'none';

const gridContainer = document.getElementById('grid-container');
const blogDetails = document.getElementById('blog-details');
const detailsTitle = document.getElementById('details-title');
const detailsDescription = document.getElementById('details-description');
const detailsText = document.getElementById('details-text');
const addBtn = document.getElementById('add-btn');

const blogs = [];

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
    detailsTitle.innerText = blogData.title;
    detailsDescription.innerText = blogData.description;
    detailsText.innerText = blogData.text;

    // Show the text content in the overlay when the "Read" button is clicked
    text.style.display = 'block';

    blogDetails.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  return blogContainer;
}

  function hideBlogDetails() {
    blogDetails.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore the scrolling behavior
  }
  
  function toggleFormVisibility(showForm) {
    if (showForm) {
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
  
        const blogElement = createBlogElement(newBlog);
        gridContainer.appendChild(blogElement);
  
        formContainer.innerHTML = '';
        formContainer.style.display = 'none';
        addBtn.style.display = 'block';
      });
    } else {
      formContainer.style.display = 'block';
      addBtn.style.display = 'none';
    }
  }
  
  addBtn.addEventListener('click', function () {
    toggleFormVisibility(true);
  });
  
  const cutIconDetails = document.getElementById('cut-icon');
  cutIconDetails.addEventListener('click', function () {
    hideBlogDetails();
  });
  
  // Check if form should be shown based on grids when the page loads
  toggleFormVisibility(gridContainer.getElementsByClassName('grid').length === 0);