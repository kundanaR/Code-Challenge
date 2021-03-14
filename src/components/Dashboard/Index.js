import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import {Tabs, Tab, Container, Row, Col, Card} from 'react-bootstrap';
import surfacesList from './surfacesList.json';
import noselection from '../../assets/select-list.png';

const { SearchBar } = Search;
const surfaceColumns = [
    {
        dataField: 'venue',
        text: 'Venue Name'
    },
    {
        dataField: 'surface',
        text: 'Surface Name'
    },
    {
        dataField: 'sport',
        text: 'Sport'
    },
    {
        dataField: 'status',
        text: 'Status'
    }
];

const serverColumns = [
  {
      dataField: 'ip',
      text: 'Ip4'
  },
  {
      dataField: 'dns',
      text: 'DNS'
  }
];

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'surfaces',
      surfaceSelection: {},
      surfaceList: surfacesList,
      serverList: [],
      serverListRef: [],
    };
  }

  groupServerFromProduct = () => {
    const serverListRef = {};
    const serverList = [];

    surfacesList.map((sD) => { 
      serverListRef[sD.ip] = serverListRef[sD.ip] || [];
      serverListRef[sD.ip].push({...sD});
    });

    Object.values(serverListRef).map((sL) => {
      serverList.push(
        {
          _id: sL[0]._id,
          ip: sL[0].ip,
          dns: sL[0].dns,
        }
      )
    })

    this.setState({serverList: serverList, serverListRef: serverListRef});
  }

  componentDidMount() {
    this.groupServerFromProduct();
  }

  handleSearch = () => {
      
  }

  render() {

    const options = {
        pageStartIndex: 1,
        alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: false, // Hide the going to First and Last page button
        hideSizePerPage: true, // Hide the sizePerPage dropdown always
        hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '10', 
          value: 10
        }]
    };
  
    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        this.setState({surfaceSelection: row});
      },
    };

    const expandRow = {
      showExpandColumn: true,
      expandColumnPosition: 'right',
      renderer: (row, rowIndex) => (
        <table className="table table-bordered">
          <thead>
            <tr>
                <th tabindex="0">Venue Name</th>
                <th tabindex="0">Surface Name</th>
                <th tabindex="0">Sport</th>
                <th tabindex="0">Status</th>
            </tr>
          </thead>
          <tbody>
            {serverListRef[row.ip].map((venueList) => { 
              return (
                <tr>
                  <td>
                    {venueList.venue}
                  </td>
                  <td>
                    {venueList.surface}
                  </td>
                  <td>
                    {venueList.sport}
                  </td>
                  <td>
                    {venueList.status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    };

    const {surfaceSelection, serverList, activeTab, serverListRef} = this.state;

    return (
      <Container className="p-0">
        <Row>
          <Col md="9">
            <Tabs defaultActiveKey={activeTab} onSelect={(s) => { this.setState({activeTab: s, surfaceSelection: []})}}>
              <Tab eventKey="surfaces" title="Surfaces" className="pt-3">
                <ToolkitProvider
                  keyField="_id"
                  data={ surfacesList }
                  columns={ surfaceColumns }
                  search
                >
                  {
                    props => (
                      <div>
                        <SearchBar { ...props.searchProps } className="w-100"/>
                        <BootstrapTable
                          { ...props.baseProps }
                          pagination={ paginationFactory(options) }
                          filter={ filterFactory() }
                          selectRow={ selectRow }
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
              </Tab>
              <Tab eventKey="servers" title="Servers">
                <BootstrapTable keyField='_id' data={ serverList } columns={ serverColumns } pagination={ paginationFactory(options) } expandRow={ expandRow } selectRow={ selectRow }/>
              </Tab>
            </Tabs>
          </Col>
          <Col md="3">
            <Card>
              <Card.Header>Details</Card.Header>
              {Object.values(surfaceSelection).length === 0 && 
                <div className="text-center">
                  <img alt="No Selection" src={noselection} width="250" height="250" />
                  <p>Tap on {activeTab === 'surfaces' ? 'venue' : 'Ip4'} for details</p>
                </div>
              }
              {Object.values(surfaceSelection).length > 0 &&
                <Card.Body className="p-3">
                  {surfaceSelection?.venue && 
                    <>
                      <label className="font-weight-bold">Venue Name</label>
                      <Card.Text>
                        {surfaceSelection.venue}
                      </Card.Text>
                      <label className="font-weight-bold">Surface Name</label>
                      <Card.Text>
                        {surfaceSelection.surface}
                      </Card.Text>
                      <label className="font-weight-bold">Sport</label>
                      <Card.Text>
                        {surfaceSelection.sport}
                      </Card.Text>
                      <label className="font-weight-bold">Status</label>
                      <Card.Text>
                        {surfaceSelection.status}
                      </Card.Text>
                    </>
                  }
                  <label className="font-weight-bold">IP4</label>
                  <Card.Text>
                    {surfaceSelection.ip}
                  </Card.Text>
                  <label className="font-weight-bold">DNS</label>
                  <Card.Text>
                    {surfaceSelection.dns}
                  </Card.Text>
                  {serverListRef[surfaceSelection.ip] && 
                    <>
                      <label className="font-weight-bold">Active Venue</label>
                      <Card.Text>
                        {serverListRef[surfaceSelection.ip].length}
                      </Card.Text>
                    </>
                  }
                </Card.Body>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}