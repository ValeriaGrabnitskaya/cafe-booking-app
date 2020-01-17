import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

class Authentification extends React.PureComponent {

    state = {
        login: '',
        password: ''
    };

    validateForm = () => {

    }

    render() {
        return (
            <div className="container">
                <h1>Вход</h1>
                <form onSubmit={this.validateForm}>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                    <button type="submit" className="btn btn-primary">Войти</button>
                </form>
            </div>
        )
    }
}

export default Authentification;