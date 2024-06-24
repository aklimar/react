import React, {  useState, useEffect, useRef } from "react";
import MyButton from './../сomponents/UI/button/MyButton';
import PostForm from './../сomponents/PostForm';
import PostList from './../сomponents/PostList';
import Pagination from './../сomponents/UI/pagination/Pagination';
import PostFilter from './../сomponents/PostFilter';
import MyModal from './../сomponents/UI/MyModal/Modal';
import Loader from './../сomponents/UI/Loader/Loader';
import PostService from './../API/PostService';
import { useFetching } from './../hooks/useFetching';
import { getPageCount } from './../utils/pages';
import { usePosts } from '../hooks/usePosts';
import '../styles/App.css';
import { useObserver } from "../hooks/useObserver";
import MySelect from "../сomponents/UI/select/MySelect";


function Posts() {
  const [posts, setPosts] = useState([ ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });

  const[totalPages,setTotalPages]=useState(0);

  const[limit,setLimit]=useState(10);

  const[page,setPage]=useState(1);

  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const lastElement=useRef()
  

  const[fetchPosts, isPostLoading,postError]=useFetching(async(limit,page)=>{
    const response = await PostService.getAll(limit,page);
    setPosts([...posts,...response.data]);
    const totalCount=response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount,limit))
  })
  
  const changePage=(page)=>{
    setPage(page);
  }

  

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }
  useObserver(lastElement, page<totalPages, isPostLoading, () =>{setPage(page+1)})

  useEffect(()=>{
    fetchPosts(limit,page)
  }, [limit,page])

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal  visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }}></hr>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value=>setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          {value:5,name:'5'},
          {value:10,name:'10'},
          {value:25,name:'25'},
          {value:-1,name:'Показать все'}
        ]}
      />
      {postError &&
        <h1>
          Произошла ошибка ${postError}
        </h1>
      }
      <PostList 
        posts={sortedAndSearchedPosts}
        remove={removePost}
        title="Посты про программирование"/>
        <div ref={lastElement} style={{height:20,background:'red'}}></div>
      {isPostLoading &&
        <div style={{display:'flex', justifyContent:'center', marginTop:'50'}}><Loader/></div>
        }
        
      
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
      
    </div>
  );
}

export default Posts;

