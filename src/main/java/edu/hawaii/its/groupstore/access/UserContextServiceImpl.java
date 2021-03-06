package edu.hawaii.its.groupstore.access;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserContextServiceImpl implements UserContextService {

    @Override
    public User getCurrentUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return (User) principal;
            }
        }
        return new AnonymousUser();
    }

    @Override
    public String getCurrentUsername() {
        return getCurrentUser().getUsername();
    }

    @Override
    public String getCurrentUhuuid() {
        return getCurrentUser().getUhuuid();
    }

    @Override
    public void setCurrentUhuuid(String uhuuid) {
        User user = getCurrentUser();
        if (user.hasRole(Role.ADMIN)) {
            user.setUhuuid(uhuuid);
        }
    }

    @Override
    public String toString() {
        return "UserContextServiceImpl [context=" + SecurityContextHolder.getContext() + "]";
    }
}
