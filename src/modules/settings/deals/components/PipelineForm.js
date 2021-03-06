import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'modules/common/components';
import { Stages } from './';

const propTypes = {
  show: PropTypes.bool,
  boardId: PropTypes.string,
  pipeline: PropTypes.object,
  stages: PropTypes.array,
  save: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

class PipelineForm extends Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.onChangeStages = this.onChangeStages.bind(this);
    this.generateDoc = this.generateDoc.bind(this);

    this.state = { stages: (props.stages || []).map(stage => ({ ...stage })) };
  }

  onChangeStages(stages) {
    this.setState({ stages });
  }

  save(e) {
    e.preventDefault();

    const { save, closeModal, pipeline } = this.props;

    save(this.generateDoc(), () => closeModal(), pipeline);
  }

  generateDoc() {
    const { pipeline } = this.props;

    return {
      doc: {
        name: document.getElementById('pipeline-name').value,
        boardId: pipeline ? pipeline.boardId : this.props.boardId,
        stages: this.state.stages.filter(el => el.name)
      }
    };
  }

  renderContent() {
    const { pipeline } = this.props;
    const { stages } = this.state;

    return (
      <div>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>

          <FormControl
            id="pipeline-name"
            defaultValue={pipeline ? pipeline.name : ''}
            type="text"
            autoFocus
            required
          />
        </FormGroup>

        <Stages stages={stages} onChangeStages={this.onChangeStages} />
      </div>
    );
  }

  render() {
    const { show, pipeline, closeModal } = this.props;

    if (!show) return null;

    return (
      <Modal show={show} onHide={closeModal}>
        <form onSubmit={this.save}>
          <Modal.Header closeButton>
            <Modal.Title>
              {pipeline ? 'Edit pipeline' : 'Add pipeline'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.renderContent()}

            <Modal.Footer>
              <Button
                btnStyle="simple"
                type="button"
                icon="cancel-1"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>

              <Button btnStyle="success" icon="checked-1" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    );
  }
}

PipelineForm.propTypes = propTypes;

export default PipelineForm;
