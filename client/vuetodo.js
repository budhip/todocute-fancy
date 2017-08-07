new Vue ({
  el: '#app',
  data: {
    todos: [],
    user: '',
    todo: '',
    tags: '',
    tglTaskTodo: '',
    search: '',
    getSearch: '',
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
  },
  created(){
    this.populateTodo,
    this.getUser()
  },
  methods: {
    populateTodo(){
      var self = this;
      console.log('selftoken',localStorage.getItem('token'));
      if(self.token.length> 0) {
        axios.post('http://localhost:3000/todos', {
          token: self.token
        })
        .then(response => {
          console.log('ini populateTodo response',response);
          self.todos = response.data;
          self.getSearch = false;
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        window.location.href = 'index.html'
      }
    },
    getUser() {
      var self = this;
      axios.post('http://localhost:3000/userinfo', {
        token: self.token
      })
      .then(response => {
        console.log('ini dari getuser', response.data);
        self.user = response.data;
      })
      .catch(err => {
        console.log(err);
      })
    },
    createNew() {
      var self = this;
      axios.post('http://localhost:3000/todos/add', {
        task: self.todo,
        tglTaskTodo: self.tglTaskTodo,
        tags: self.tags,
        token: self.token
      })
      .then(response => {
        self.todo = ''
        self.tags = ''
        self.tglTaskTodo = ''
        self.populateTodo()
      })
      .catch(err => {
        console.log(err);
      })
    },
    toggleStatus(todo) {
      var value = !todo.status;
      todo.status = value;
      axios.put(`http://localhost:3000/todos/${todo._id}/toggle`, {
        status: value
      })
      .then(response => {
      })
    },
    remove(todo, index) {
      if(window.confirm("Remove this item?")) {
        app.todos.splice(index, 1)
        axios.delete(`http://localhost:3000/todos/${todo._id}`, {
          data: {
            _id: todo._id
          }
        })
      }
    },
    searchTag: function(e) {
      e.preventDefault()
      console.log('tes');
      let result = []
      if(this.search.length > 0) {
        this.todos.forEach(todo => {
          if(todo.tags.includes(this.search)) {
            result.push(todo)
          }
        })
        this.getSearch = true
      } else {
        this.populateTodo()
      }
      this.todos = result
      this.search = ''
    },
    doLogout(){
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      window.location.href = "./index.html";
    }
  }
})
