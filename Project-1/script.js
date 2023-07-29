const formTemplate = `
    <span id="cut-icon">✂</span>
    <form>
        <input type="text" placeholder="Enter Blog Post URL">
        <input type="text" placeholder="Entet Blog Title">
        <input type="text" placeholder="Enter Blog Description">
        <textarea placeholder="Write Here" id="text" cols="30" rows="10"></textarea>
        <button id="blog-btn">Add Blog</button>
    </form>
`;

const formContainer = document.getElementById('form-container');
formContainer.style.display = 'none';

document.getElementById('add-btn').addEventListener('click', function() {
    formContainer.innerHTML = formTemplate;
    formContainer.style.display = 'block';
});

formContainer.addEventListener('click', function(event) {
    if (event.target.id === 'cut-icon') {
        formContainer.style.display = 'none';
    } 
});








// Update the event listener for the "Read" buttons in the grid
const readButtons = document.querySelectorAll('.grid button');
readButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showExpandedBlogDetails(index);
    });
});

// Function to show the expanded blog details
function showExpandedBlogDetails(index) {
    const gridItems = document.querySelectorAll('.grid');
    const selectedGridItem = gridItems[index];
    const blogTitle = selectedGridItem.querySelector('h1').textContent;
    const blogDescription = selectedGridItem.querySelector('p').textContent;
    const blogImage = selectedGridItem.querySelector('img').src;

    const expandedBlogDetailsContainer = document.getElementById('expanded-blog-details');
    const expandedBlogContent = document.getElementById('expanded-blog-content');

    // Create the expanded blog details content
    const expandedBlogDetailsTemplate = `
        <img src="${blogImage}" alt="Blog Image">
        <div class="details">
            <div>
                <h1>${blogTitle}</h1>
                <p>${blogDescription}</p>
            </div>
            <textarea placeholder="Write your thoughts here..."></textarea>
        </div>
    `;

    // Update the content of the expanded blog details container and show it
    expandedBlogContent.innerHTML = expandedBlogDetailsTemplate;
    expandedBlogDetailsContainer.style.display = 'block';
}

