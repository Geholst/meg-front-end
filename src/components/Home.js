
export default function Home (){
    return (
        <section id="form">
            <h1 className="header">Welcome to MeG!</h1>
            <form>
                <label id="MeGs"> MeGs Diary</label>
                <form>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationDefault01">First name</label>
      <input type="text" class="form-control" id="validationDefault01" placeholder="First name" required /> 
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationDefault02">Last name</label>
      <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" required />
    </div>
    
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationDefault03">Where will you be going?</label>
      <input type="text" class="form-control" id="validationDefault03" placeholder="Adress" required />
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationDefault04">Who will you be with?</label>
      <input type="text" class="form-control" id="validationDefault04" placeholder="Name" required />
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationDefault05">How will you get there?</label>
      <input type="text" class="form-control" id="validationDefault05" placeholder="Uber, Lyft, Taxi?" required />
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
            </form>
        </section>
    );
}