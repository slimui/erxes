import messageFields from './messageFields.js';

const conversationChanged = `
  subscription conversationChanged($_id: String!) {
    conversationChanged(_id: $_id) {
      type
    }
  }
`;

const conversationMessageInserted = `
  subscription conversationMessageInserted($_id: String!) {
    conversationMessageInserted(_id: $_id) {
      ${messageFields}
    }
  }
`;

const conversationsChanged = `
  subscription conversationsChanged {
    conversationsChanged {
      type
      customerId
    }
  }
`;

const customerConnectionChanged = `
  subscription customerConnectionChanged ($_id: String!) {
    customerConnectionChanged (_id: $_id) {
      _id
      status
    }
  }
`;

export default {
  conversationChanged,
  conversationMessageInserted,
  conversationsChanged,
  customerConnectionChanged
};
