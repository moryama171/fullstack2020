import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../redux/hooks';
import blogService from '../services/blogs';
import { deleteBlog, updateBlog } from '../redux/reducers/blogReducer';
import Comments from './Comments';
import { Button, Grid } from 'semantic-ui-react';


const Blog = ({ blog }) => {
    const notificationHook = useNotification();
    const user = useSelector(({ user }) => { return user; });
    const isUserBlog = blog ? user.username === blog.user.username : false;

    // const blogStyle = {
    //   paddingTop: 10,
    //   paddingBottom: 10,
    //   paddingLeft: 2,
    //   borderWidth: 1,
    //   marginBottom: 5
    // };

    const dispatch = useDispatch();

    const removeBlog = async (blog) => {
        if (window.confirm(`Delete ${blog.title}?`)) {
            try {
                dispatch(deleteBlog(blog.id));
                blogService.setToken(user.token);
                notificationHook.show('Successfully removed blog');
            } catch (exception) {
                notificationHook.show('Could not remove blog, sorry', true);
            }
        }
    };

    const changeBlog = async (id, blogObject) => {
        try {
            dispatch(updateBlog(id, blogObject));
            notificationHook.show('Awesome');
        } catch (exception) {
            notificationHook.show('Could not update blog', true);
        }
    };

    const addLike = () => {
        changeBlog(
            blog.id,
            {
                author: blog.author,
                title: blog.title,
                url: blog.url,
                user: blog.user.id,
                likes: blog.likes + 1
            }
        );
    };

    const remove = () => {
        removeBlog(blog);
    };

    if (blog) {
        return (
            // <div style={blogStyle}>
            <div>
                <Grid className='blog'>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <h1 id='blogHeadline'>
                                {blog.title}, {blog.author}
                            </h1>
                            <div className='blog-details'>
                                <p>{blog.url}</p>
                                <p className='blog-likes'>
                                    likes {blog.likes}
                                    <Button color='yellow' className='like-button' onClick={addLike}>like</Button>
                                </p>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            {
                                isUserBlog
                                    ? <Button secondary floated='right' className='remove-button' onClick={remove}>remove</Button>
                                    : null
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Comments blog={blog} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

    return null;
};

export default Blog;
