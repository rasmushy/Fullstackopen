import { useState } from 'react';

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
	const [showBlogDetails, setBlogDetails] = useState(false);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleLike = async (event) => {
		event.preventDefault();
		const updatedBlog = {
			author: blog.author,
			title: blog.title,
			url: blog.url,
			id: blog.id,
			likes: blog.likes + 1,
		};
		likeBlog(updatedBlog);
	};

	return (
		<div style={blogStyle}>
			<div>
				{` `}
				<strong>{blog.title}</strong>
				{`  by`} {blog.author}
				{` `}
				<button onClick={() => setBlogDetails(!showBlogDetails)}>
					{showBlogDetails ? 'hide' : 'view'}
				</button>
				{showBlogDetails ? (
					<form onSubmit={handleLike}>
						<p>{blog.url}</p>
						<p>
							{blog.likes} likes
							<button type='submit' name='likeBtn'>
								like
							</button>
						</p>
						<p>
							{!blog.user
								? 'test user'
								: blog?.user?.name || blog?.user?.username}
						</p>
						{blog?.user?.username === user?.username ? (
							<button onClick={() => deleteBlog(blog)}>
								remove
							</button>
						) : null}
					</form>
				) : null}
			</div>
		</div>
	);
};

export default Blog;
