package kr.ymtech.view.resolver;

import java.util.Locale;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

/**
* 
 * @since 2016. 2. 22.
* @author Park_Jun_Hong_(fafanmama_at_naver_com)
*/
public class JsonViewResolver implements ViewResolver {

    /**
     * 
     * @since 2016. 2. 22.
     */
    public JsonViewResolver() {
    }

    /**
     * @see org.springframework.web.servlet.ViewResolver#resolveViewName(java.lang.String, java.util.Locale)
     */
    @Override
    public View resolveViewName(String viewName, Locale locale) throws Exception {
        MappingJackson2JsonView view = new MappingJackson2JsonView();

        return view;
    }

}
