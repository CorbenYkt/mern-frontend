import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Link } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const navigate = useNavigate();
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(null);
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
      })
        .catch((err) => {
          console.error('Failed to fetch post:', err);
        });
    }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter post text here...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        imageUrl,
        text
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="w-full max-w-full mx-auto p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => inputFileRef.current.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Upload image
        </button>
      </div>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {
        imageUrl && (
          <div className="mt-4">
            <button
              onClick={onClickRemoveImage}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <img className="mt-2 w-full rounded-lg" src={'https://mern.corbenykt.ru' + `${imageUrl}`} alt="Uploaded" />
          </div>
        )
      }
      <br />
      <input
        type="text"
        placeholder="Topic..."
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SimpleMDE
        className="mt-4 w-full max-w-full text-left"
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className="mt-6 flex space-x-4">
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          {isEditing ? 'Save' : 'Post'}
        </button>
        <Link to="/">
          <button className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};
