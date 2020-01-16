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

            /* <form onSubmit={this.validateForm} className="container">
        <span className="p-float-label">
            <InputText id="float-input" type="text" size="30" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} />
            <label htmlFor="float-input">Логин</label>
        </span>
        <div>
            <div className="content-section introduction">
                <div className="feature-intro">
                    <h1>Password</h1>
                    <p>Password displays strength indicator for password fields.</p>
                </div>
            </div>

            <div className="content-section implementation">
                <h3 className="first">Пароль</h3>
                <Password value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
            </div>
        </div>
        <Button className="btn btn-primary" label="Зарегистрироваться" type="submit" />
        <Button className="btn btn-primary" label="Войти" type="submit" />
    </form> */
        )
    }
}

export default Authentification;