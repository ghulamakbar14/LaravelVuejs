<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Todo</div>

                    <div class="card-body">
                        <div class="input-group">
                            <input class="form-group" type="text" v-model="name" placeholder="Name.." arial-label="todo" arial-describedby="name" />
                            <input class="form-group" type="text" v-model="description" placeholder="Description.." arial-label="description" arial-describedby="description" />
                            <input class="form-group" type="text" v-model="price" placeholder="Price.." arial-label="price" arial-describedby="price" />
                            <div class="input-group-append">
                                <button v-if="!edit_todo_id" type="button" class="btn btn-info" @click="addTodo()">Add</button>
                                <button v-else type="button" class="btn btn-info" @click="updateTodo()">Update</button>
                            </div>
                            <button type="button" class="btn btn-sm" @click="resetTodo()">Clear</button>
                        </div>
                        <table class="table table-bordered mt-5">
                            <thead>
                            <tr>
                                <td>Sr no.</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(todo, index) in todos" :key="index">
                                    <td>{{++index}}</td>
                                    <td>{{todo.name}}</td>
                                    <td>{{todo.description}}</td>
                                    <td>{{todo.price}}</td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-info" @click="editTodo(--index)" >Edit</button>
                                        <button type="button" class="btn btn-sm btn-danger" @click="deleteTodo(--index)" >Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                todos: [],
                api: 'http://localhost:8000/api/todos',
                name: '',
                description: '',
                price: '',
                edit_todo_id: '',
                edit_todo_index: ''
            }
        },
        mounted() {
            axios.get(this.api).then(res => {
                this.todos = res.data;
            });
        },
        methods: {
            addTodo() {
                let todo_data = {'name': this.name, 'description': this.description, 'price': this.price};
                axios.post(this.api, todo_data).then(res => {
                    this.todos.push(res.data);
                    this.name = '';
                    this.description = '';
                    this.price = '';
                });
            },
            deleteTodo(index) {
                if(confirm("Do you really want to delete?")){
                    if(this.todos[index].id) {
                        axios.delete(this.api+'/'+this.todos[index].id).then(res => {
                            this.todos.splice(index, 1);
                        });
                    }
                }
            },
            editTodo(index) {
                if(this.todos[index].id) {
                    this.name = this.todos[index].name;
                    this.description = this.todos[index].description;
                    this.price = this.todos[index].price;

                    this.edit_todo_id = this.todos[index].id;
                    this.edit_todo_index = index;
                }
            },
            updateTodo() {
                if(this.todos[this.edit_todo_index].id) {
                    let todo_data = {'name': this.name, 'description': this.description, 'price': this.price};
                    axios.patch(this.api+'/'+this.todos[this.edit_todo_index].id, todo_data).then(res => {
                        this.todos[this.edit_todo_index].name = res.data.name;
                        this.todos[this.edit_todo_index].description = res.data.description;
                        this.todos[this.edit_todo_index].price = res.data.price;
                        this.resetTodo();
                    });
                }
            },
            resetTodo() {
                this.name = '';
                this.description = '';
                this.price = '';
            }
        }
    }
</script>
