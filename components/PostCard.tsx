
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { Button } from './ui/Button';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
        </div>
        <CardHeader>
          <CardTitle className="text-primary">{post.title}</CardTitle>
          {/* FIX: Access the `name` property of the author object. `post.author` is an object and cannot be rendered directly as a React child. Added optional chaining `?.` for safety. */}
          <CardDescription>{post.date} - {post.author?.name}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <div className="p-6 pt-0">
          <Button variant="link" className="px-0">Leer artículo completo &rarr;</Button>
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;