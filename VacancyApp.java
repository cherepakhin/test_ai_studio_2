
package com.elevatehr.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.RootPanel;
import com.elevatehr.client.view.VacancyView;

public class VacancyApp implements EntryPoint {
    
    public void onModuleLoad() {
        VacancyView view = new VacancyView();
        RootPanel.get().add(view);
    }
}
