(function() {

    function StoreController($scope, CartService) {

        // The current user's path is requested as a sequence of paths the user has taken before
        var currentPath = [
            { id: '1', name: 'hawaii.edu : store', description: 'Home', type: 'folder', path: 'hawaii.edu:store'}
        ];

        $scope.panelText = 'Group Store';
        $scope.panelDescription = 'Home';

        /**
         * Gets the parent path of an item in the store.
         * @param {object} item - the item to get its parent path
         * @returns {string} the parent path
         */
        $scope.getParentPath = function(item) {
            return item.path.slice(0, item.path.lastIndexOf(':'));
        };

        /**
        * Checks whether an item exists in the user's current path.
        * @param {object} item - the item to check
        * @returns {boolean} true if the item exists in the current path, otherwise returns false
        */
        $scope.isInCurrentPath = function(item) {
            var itemParentPath = $scope.getParentPath(item);
            return itemParentPath === currentPath[currentPath.length - 1].path;
        };

        /**
         * Checks whether the user is at the home path (hawaii.edu:store). Since the current path is represented as a
         * sequence of paths the user has taken, the user will be at the home path if there is only 1 item in the
         * current path sequence.
         * @returns {boolean} true if the user is at the home path, otherwise returns false
         */
        $scope.isAtHomePath = function() {
            return (currentPath.length === 1) && (currentPath[currentPath.length - 1].path === 'hawaii.edu:store');
        };

        /**
         * Moves the user up one path when clicking on a folder/group.
         * @param {object} item - the place to move to
         */
        $scope.goToPath = function(item) {
            if (item.type === 'folder') {
                currentPath.push(item);
                $scope.setPanelText();
            } else if (item.type === 'group') {
                CartService.addToCart(item);
                console.log(CartService.getAmountInCart());
            }
        };

        /**
         * Moves the user back one folder when clicking on '..'
         */
        $scope.goBackOnePath = function() {
            if (currentPath.length > 1) {
                currentPath.pop();
                $scope.setPanelText();
            }
        };

        /**
         * Moves the user to a specific path when clicking on the breadcrumb.
         * @param {number} index - the index of the path clicked
         */
        $scope.moveToPath = function(index) {
            currentPath = currentPath.slice(0, index + 1);
            $scope.setPanelText();
        }

        /**
         * Gets the icon associated with an item.
         * @param {object} item - the item to get the icon of
         * @returns {string} the icon class associated with the item
         */
        $scope.getIcon = function(item) {
            if (item.type === 'folder') {
                return 'fa fa-folder';
            } else if (item.type === 'group') {
                return 'fa fa-users';
            }
            return 'fa fa-question-circle';
        };

        /**
         * Updates the text in the panel that displays the name and description of the current folder. If a description
         * does not exist for the current folder (represented as '--'), then the description will be empty.
         */
        $scope.setPanelText = function() {
            if ($scope.isAtHomePath()) {
                $scope.panelText = 'Group Store';
                $scope.panelDescription = 'Home';
            } else {
                var name = currentPath[currentPath.length - 1].name;
                var description = currentPath[currentPath.length - 1].description;
                $scope.panelText = name;
                if (description === '--') {
                    $scope.panelDescription = '';
                } else {
                    $scope.panelDescription = description;
                }
            }
        };

        /**
         * Gets the current path of the user as an array for display on the breadcrumb. The root directory
         * (hawaii.edu:store) is combined into 1 breadcrumb item.
         * @returns {Array<string>} the user's current path
         */
        $scope.getCurrentPath = function() {
            return currentPath.map(item => item.name);
        };

        $scope.getDescAtIndex = function(index) {
            if (index < currentPath.length) {
                var desc = currentPath[index].description;
                return (desc !== '--') ? desc : '';
            }
        }

        $scope.addToCart = function(group) {
            CartService.addToCart(group);
        };

        $scope.removeFromCart = function(group) {
            CartService.removeFromCart(group);
        };

        $scope.getGroupsInCart = function() {
            return CartService.getGroupsInCart();
        };

        $scope.getAmountInCart = function() {
            return CartService.getGroupsInCart().length;
        };

        $scope.isOnSearchPage = function() {
            return !!searchParams.query;
        }

        $scope.sources = [
            'All Sources',
            'Human Resources Information Systems',
            'Research Corporation of the University of Hawaii',
            'Student Employment and Cooperative Education',
            'Student Information Systems',
            'UH Identity Management System'
        ];

        $scope.organizations = [
            'Hawaii Community College',
            'Honolulu Community College',
            'Kauai Community College',
            'Kapiolani Community College',
            'Leeward Community College',
            'UH Maui College',
            'UH Hilo',
            'UH Manoa',
            'UH System',
            'UH West Oahu',
            'Windward Community College',
            'Employment Training Center',
            'East-West Center',
            'Maui High Performance Computing Center',
            'Research Corporation of the University of Hawaii',
            'UH Foundation',
            'University Laboratory School'
        ];

        $scope.searchParams = {};

        $scope.availableSearchParams = [
            { key: 'source', name: 'Source', restrictToSuggestedValues: true, suggestedValues: $scope.sources },
            { key: 'org', name: 'Organization', placeholder: 'Organization', restrictToSuggestedValues: true, suggestedValues: $scope.organizations },
            { key: 'term', name: 'Term', placeholder: '4-6 Digit Term Code' },
            { key: 'eac', name: 'EAC', placeholder: 'Employing Agency Code' },
            { key: 'crn', name: 'CRN', placeholder: 'Course Reference Number'}
        ];

        $scope.isBrowsingThroughStore = function() {
            return !$scope.searchParams.query;
        };

        $scope.filterBySearchQuery = function(item) {
            return item.name.includes($scope.searchParams.query) && item.type === 'group';
        };

        $scope.store = [
            { id: '1', name: 'hawaii.edu:store', description: 'Home', type: 'folder', path: 'hawaii.edu:store'},
            { id: '1', name: 'any-dataOrigin', description: 'All Sources', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin'},
            { id: '2', name: 'hris', description: 'Human Resources Information Systems', type: 'folder', path: 'hawaii.edu:store:hris' },
            { id: '3', name: 'rcuh', description: 'Research Corporation of the University of Hawaii', type: 'folder', path: 'hawaii.edu:store:rcuh' },
            { id: '4', name: 'sece', description: 'Student Employment and Cooperative Education', type: 'folder', path: 'hawaii.edu:store:sece' },
            { id: '5', name: 'sis', description: 'Student Information Systems', type: 'folder', path: 'hawaii.edu:store:sis' },
            { id: '6', name: 'uhims', description: 'UH Identity Management System', type: 'folder', path: 'hawaii.edu:store:uhims' },
            { id: '7', name: 'empty', description: '--', type: 'group', path: 'hawaii.edu:store:empty' },
            { id: '8', name: 'aff', description: '--', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff' },
            { id: '9', name: 'any-org', description: 'All organizations', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:any-org' },
            { id: '10', name: 'etc', description: 'Employment Training Center', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:etc' },
            { id: '11', name: 'ewc', description: 'East-West Center', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:ewc' },
            { id: '12', name: 'hawcc', description: 'Hawaii Community College', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:hawcc' },
            { id: '13', name: 'hcc', description: 'Honolulu Community College', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:hcc' },
            { id: '13', name: 'kauiacc', description: 'Kauai Community College', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:kauicc' },
            { id: '14', name: 'lcc', description: 'Leeward Community College', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:lcc' },
            { id: '15', name: 'mauicc', description: 'UH Maui College', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:mauicc' },
            { id: '16', name: 'mhpcc', description: 'Maui High Performance Computing Center', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:mhpcc' },
            { id: '18', name: 'rcuh', description: 'Research Corporation of the University of Hawaii', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:rcuh' },
            { id: '20', name: 'uhf', description: 'UH Foundation', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:uhf' },
            { id: '21', name: 'uhh', description: 'UH Hilo', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:uhh' },
            { id: '22', name: 'uhm', description: 'UH Manoa', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:uhm' },
            { id: '23', name: 'uhs', description: 'University Lab School', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:uhs' },
            { id: '24', name: 'uhsystem', description: 'UH System', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:uhsystem' },
            { id: '25', name: 'uhwo', description: 'UH West Oahu', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:uhwo' },
            { id: '26', name: 'wcc', description: 'Windward Community College', type: 'folder', path: 'hawaii.edu:store:any-dataOrigin:aff:wcc' },
            { id: '26', name: 'faculty+staff', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:faculty+staff' },
            { id: '26', name: 'faculty+staff+student', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:faculty+staff+student' },
            { id: '26', name: 'faculty+staff+student+other', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:faculty+staff+student+other' },
            { id: '26', name: 'ohana', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:ohana' },
            { id: '26', name: 'retiree', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:retiree' },
            { id: '26', name: 'staff', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:staff' },
            { id: '26', name: 'staff.noDetails', description: '--', type: 'group', path: 'hawaii.edu:store:any-dataOrigin:aff:etc:staff.noDetails' },

        ];
    }
    storeApp.controller('StoreController', StoreController);

})();
