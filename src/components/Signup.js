export default function Signup (){
    return (
        <section>
            <h1>Signup page!</h1>
            <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username" id="username-input" aria-label="Username" aria-describedby="basic-addon1" />
  <span class="input-group-text">#</span>
  <input type="password" class="form-control"  placeholder="Password"  id="password-input" aria-label="Password" aria-describedby="basic-addon1" />

    <button id="login-btn" type="submit" class="btn btn-success">Submit</button>

        </section>
    )
}