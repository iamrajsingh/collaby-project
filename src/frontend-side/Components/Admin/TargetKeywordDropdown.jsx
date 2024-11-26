import React, { Component } from "react";
import Select from "react-select";
import apiService from "../../../service/apiService";

class TargetKeywordDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTargetKeyword: null,
      keywords:[],
    };
  }

  componentDidMount() {
    this.fetchTeamLists();
  }

  fetchTeamLists = async () => {
    try {
      const response = await apiService.get("front/all_keywords");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        // const filteredTeams = response.data.filter(
        //   (keyword) => keyword.keyward
        // );

        // Sort the filtered lists
        //const sortedLists = filteredTeams.sort((a, b) => b.id - a.id);

        // Update the state with the filtered and sorted lists
        this.setState({
          keywords: response.data,
        });
      }
    } catch (error) {
    }
  };

  handleTargetChange = (selectedTargetKeyword) => {
    this.setState({ selectedTargetKeyword });
    this.props.onChangeTargetKeywordProp(selectedTargetKeyword);
  };

  componentDidUpdate(prevProps, prevState) {
    // Check if the data prop has changed
    if (
      this.props.selectedTargetKeywordProp !==
      prevProps.selectedTargetKeywordProp
    ) {
      // Perform actions or side effects here
 
      const myArray = this.props?.selectedTargetKeywordProp?.split(","); //["a","b"]

      if (myArray == "" && myArray.length == "1") {
        this.setState({
           selectedTargetKeyword: null
        });
      }
      else { 
        const data = [];
        // Loop through array1 and add each element to both label and value properties
        for (let i = 0; i < myArray.length; i++) {
          data.push({ label: myArray[i], value: myArray[i] });
        }
       
      this.setState({
        selectedTargetKeyword: data,
      });
      }


    }
  }

  render() {
    // const target_project_keyword = [
    //   { value: "Web3 Infrastructure", label: "Web3 Infrastructure" },
    //   { value: "Developer Tools", label: "Developer Tools" },
    //   { value: "Exchange", label: "Exchange" },
    //   // { value: "CEX", label: "CEX" },
    //   { value: "DEX", label: "DEX" },
    //   { value: "DAO", label: "DAO" },
    //   { value: "DeFi", label: "DeFi" },
    //   { value: "Data Provider", label: "Data Provider" },
    //   { value: "Wallet", label: "Wallet" },
    //   { value: "NFT ", label: "NFT " },
    //   { value: "Gaming", label: "Gaming" },
    //   { value: "Gambling", label: "Gambling" },
    //   // { value: "Meme", label: "Meme" },
    //   { value: "L1", label: "L1" },
    //   { value: "L2", label: "L2" },
    //   { value: "Identity", label: "Identity" },
    //   { value: "Security and Audits", label: "Security and Audits" },
    //   { value: "Asset Management", label: "Asset Management" },
    //   { value: "Mining Companies", label: "Mining Companies" },
    //   { value: "Outsource & Agencies", label: "Outsource & Agencies" },
    //   {
    //     value: "Banking & Financial Institutions",
    //     label: "Banking & Financial Institutions",
    //   },
    //   { value: "NFT Marketplaces", label: "NFT Marketplaces" },
    //   // { value: "Payments & Remittance", label: "Payments & Remittance" },
    //   // {
    //   //   value: "Data Platform & Analytics",
    //   //   label: "Data Platform & Analytics",
    //   // },
    //   // { value: "Web2 Companies", label: "Web2 Companies" },
    //   // { value: "Venture Capital ", label: "Venture Capital " },
    //   // { value: "Social", label: "Social" },
    //   // { value: "Oracles", label: "Oracles" },
    //   // { value: "Supply Chain Management", label: "Supply Chain Management" },
    //   // { value: "Privacy", label: "Privacy" },
    //   // { value: "Bridges", label: "Bridges" },
    // ];

    return (
      <div className="col-md-6 col-sm-6 col-xs-12">
        <div className="form-group">
          <label htmlFor="target_project_keyword">Target Keyword:</label>
          <Select
            name="target_project_keyword"
            options={this.state.keywords}
            value={this.state.selectedTargetKeyword}
            onChange={this.handleTargetChange}
            isMulti={true}
          />
        </div>
      </div>
    );
  }
}

export default TargetKeywordDropdown;
