import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PostItem = ({ post, db, setPosts }) => {
    const [newComment, setNewComment] = useState('');

    const handleLike = async (id, likes) => {
        const postRef = doc(db, 'post', id);
        try {
            await updateDoc(postRef, { likes: likes + 1 });
            setPosts(posts.map((p) => (p.id === id ? { ...p, likes: likes + 1 } : p)));
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    const handleComment = async (postId) => {
        if (!newComment.trim()) return; // No agregar comentarios vacíos
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            alert('Debes iniciar sesión para comentar.');
            return;
        }

        const commentData = {
            commentText: newComment,
            createdAt: new Date(),
            createdBy: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            },
        };

        const postRef = doc(db, 'post', postId);
        try {
            await updateDoc(postRef, {
                comments: arrayUnion(commentData),
            });

            // Actualizamos los comentarios en el estado local
            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p.id === postId
                        ? { ...p, comments: [...p.comments, commentData] }
                        : p
                )
            );

            setNewComment(''); // Limpiar campo de comentario
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
        // console.log('Comentario:', newComment, 'Post ID:', postId);
    };

    return (
        <div className="post">
            {/* ... otros elementos del post ... */}
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
            />
            <button onClick={() => handleComment(post.id)}>Agregar Comentario</button>
        </div>
    );
};

export default PostItem;