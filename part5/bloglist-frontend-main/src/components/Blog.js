import { useState } from 'react';

const Blog = ({ blog }) => {
	const [showBlogDetails, setBlogDetails] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} {blog.author}
				<button onClick={() => setBlogDetails(!showBlogDetails)}>
					{showBlogDetails ? 'hide' : 'view'}
				</button>
				{showBlogDetails ? (
					<div>
						<p>{blog.url}</p>
						<p>
							{blog.likes} likes
							<button>like</button>
						</p>
						<p>
							added by{' '}
							{!blog.user
								? 'no user'
								: blog.user.username.toString()}
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
};
export default Blog;
