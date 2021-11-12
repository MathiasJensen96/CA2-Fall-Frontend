const Bored = (props) => {
    return (
        <div>
          <h2>Bored?</h2>
          <p>{props.activity}</p>
          <p>{props.type}</p>
        </div>
      );
}

export default Bored;