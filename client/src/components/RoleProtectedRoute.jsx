import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component to protect routes based on user roles
export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7 text-red-500">
          Access Denied
        </h1>
        <p className="text-center">
          You don&apos;t have permission to access this page.
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Required roles: {allowedRoles.join(', ')}
        </p>
        <p className="text-center text-sm text-gray-500">
          Your role: {currentUser.role}
        </p>
      </div>
    );
  }

  return children;
}

RoleProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
