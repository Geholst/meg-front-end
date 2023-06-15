export default function Home() {
  return (
    <div className="container p-2 bg-warning">
      <section className="card p-2 mb-2">
        <h1 className="card-title p-2">Welcome to My E-Guardian App</h1>
      </section>
      <section className="card p-2 mb-2">
        <h2 className="card-title p-2">What is My E-Guardian App?</h2>
        <p className="card-text p-2">
          My E-Guardian App is a web application that allows users to log and
          track different journeys. These journeys can be anything from a trip
          to the grocery store to a trip to the hospital. Users can also log
          their experiences at different locations and rate them. This
          information can be used to help other users make informed decisions
          about where they go and what they do. This information is intended to
          be saved and shared to our database. To user can share information by
          logging and retrieve their information by looking through their
          dashboard. In the dashboard, the user can also add journey,
          experience, and rating information. The user also has the ability to
          click on the location button if they wish to screenshot and save a
          local map of their current location to their device's local
          storage(somewhere in their photo library).
        </p>
      </section>
      <section className="card p-2">
        <h2 className="card-title p-2">How to use My E-Guardian App</h2>
        <p className="card-text p-2">
          To use My E-Guardian App, you must first create an account. To create
          an account, click on the signup button in the navigation bar. You will
          be prompted to enter your first name, last name, email, phone
          number,and some other signup info. After you have entered all of this
          information and submit your signup, you will be redirected to the to
          your dashboard.
        </p>
      </section>
    </div>
  );
}
