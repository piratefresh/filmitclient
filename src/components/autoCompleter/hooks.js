import React from "react";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import "./style.css";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// function renderSuggestion(suggestion) {
//   return <span>{suggestion.username}</span>;
// }

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.firstName} ${suggestion.lastName}`;

  return (
    <SuggestionContainer>
      <span className="suggestion-item">
        <img
          src={
            suggestion.avatar
              ? suggestion.avatar
              : `http://localhost:8000/myAvatars/${suggestion.id}`
          }
          alt=""
          srcset=""
        />
        <span key={suggestion.id}>{suggestionText}</span>
      </span>
    </SuggestionContainer>
  );
}

const AutoComplete = props => {
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  function getSuggestionValue(suggestion) {
    props.setSearchValue(suggestion);
    props.setFieldValue("receiverId", suggestion);
    return `${suggestion.firstName} ${suggestion.lastName}`;
  }

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  function getSuggestions(value, data) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return data.filter(
      user => regex.test(user.firstName) || regex.test(user.lastName)
    );
  }

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(getSuggestions(value, props.data.users));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search Users",
    value,
    onChange: onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

const SuggestionContainer = styled.div`
  .suggestion-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }
`;

export default AutoComplete;
