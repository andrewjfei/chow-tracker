package dev.andrewjfei.service.interceptor;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import dev.andrewjfei.service.util.StringUtil;
import dev.andrewjfei.service.util.TokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class AuthTokenInterceptor implements HandlerInterceptor {

    private final Logger logger = LoggerFactory.getLogger(AuthTokenInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String authBearerToken = request.getHeader("Authorization");

        if (authBearerToken != null) {
            String authToken = authBearerToken.split(" ")[1];
            DecodedJWT decodedJWT = TokenUtil.validateUserAuthToken(authToken);
            Map<String, Claim> tokenClaims = decodedJWT.getClaims();

            // Set user id attribute if not null
            if (tokenClaims != null && tokenClaims.containsKey("id")) {
                String id = StringUtil.removeDoubleQuotes(tokenClaims.get("id").toString());
                request.setAttribute("userId", id);
                logger.info("Auth Token Validation Success");
            }
        }

        return true;

    }
}
