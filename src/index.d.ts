// Type definitions for the browser namespace used for browser extension development
// Project: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
// Definitions by: Iulian Octavian Preda <https://github.com/IulianOctavianPreda>
// Definitions: https://github.com/firefox-webext-types
// TypeScript Version: 2.4

////////////////////
// Events
////////////////////

/**
 * The browser.events namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
 * Browser compatibility: Chrome, Firefox(50), Opera, Firefox for Android (50)
 */
declare namespace browser.events {
    /**
     *  Describes various criteria for filtering URLs.
     *  If all of the criteria specified in the filter's properties match the URL, then the filter matches.
     *  Filters are often provided to API methods in an Array of UrlFilters.
     *  For example, webNavigation listeners can be added with a filter which is an object with a single url property that is an Array of UrlFilters, e.g. {url:[UrlFilter,UrlFilter,...]}.
     *  If any filter within the Array of UrlFilters matches, then it is considered a match for the Array.
     *  Effectively, the criteria specified within a single filter are AND'ed together, while all of the individual filters within an Array are OR'ed.
     *  All criteria are case sensitive.
     *  Browser compatibility: Chrome, Firefox(50), Opera, Firefox for Android (50)
     */
    export interface UrlFilter {
        /**
         * Optional. Matches if the hostname of the URL contains the given string.
         * To test whether a hostname component starts with "foo", use ".foo".
         * This matches "www.foobar.com" and "foo.com", because an implicit dot is added at the beginning of the hostname.
         * To test whether a hostname component ends with "foo", use "foo.".
         * To test whether a hostname component exactly matches "foo", use ".foo.".
         */
        hostContains?: string;
        /** Optional. Matches if the hostname of the URL is equal to a specified string.  */
        hostEquals?: string;
        /** Optional. Matches if the hostname of the URL starts with a specified string.  */
        hostPrefix?: string;
        /**
         * Optional. Matches if the hostname of the URL ends with a specified string.
         * Example: ".example.com" matches "http://www.example.com/", but not "http://example.com/".
         * Example: "example.com" matches "http://www.example.com/", and "http://fakeexample.com/".
         */
        hostSuffix?: string;
        /** Optional. Matches if the path segment of the URL contains a specified string. */
        pathContains?: string;
        /** Matches if the path segment of the URL is equal to a specified string. */
        pathEquals?: string;
        /** Optional. Matches if the path segment of the URL starts with a specified string. */
        pathPrefix?: string;
        /** Optional. Matches if the path segment of the URL ends with a specified string. */
        pathSuffix?: string;
        /** Optional. Matches if the query segment of the URL contains a specified string. */
        queryContains?: string;
        /** Optional. Matches if the query segment of the URL is equal to a specified string.  */
        queryEquals?: string;
        /** Optional. Matches if the query segment of the URL starts with a specified string.  */
        queryPrefix?: string;
        /** Optional. Matches if the query segment of the URL ends with a specified string.  */
        querySuffix?: string;
        /** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlContains?: string;
        /** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlEquals?: string;
        /**
         * Optional. Matches if the URL (without fragment identifier) matches a specified regular expression.
         * Port numbers are stripped from the URL if they match the default port number.
         * For example: urlMatches: "^[^:]*:(?://)?(?:[^/]*\\.)?mozilla\\.org/.*$" matches "http://mozilla.org/", "https://developer.mozilla.org/", "ftp://foo.mozilla.org/", but not "https://developer.fakemozilla.org/".
         */
        urlMatches?: string;
        /**
         * Optional. Matches if the URL without query segment and fragment identifier matches a specified regular expression.
         * Port numbers are stripped from the URL if they match the default port number
         */
        originAndPathMatches?: string;
        /**
         * Optional. Matches if the URL (without fragment identifier) starts with a specified string.
         * Port numbers are stripped from the URL if they match the default port number.
         * Example: "https://developer" matches "https://developer.mozilla.org/" and "https://developers.facebook.com/".
         */
        urlPrefix?: string;
        /**
         * Optional. Matches if the URL (without fragment identifier) ends with a specified string.
         * Port numbers are stripped from the URL if they match the default port number.
         * Note that an implicit forward slash "/" is added after the host, so "com/" matches "https://example.com", but "com" does not.
         */
        urlSuffix?: string;
        /**
         * Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.
         * Because schemes are always converted to lowercase, this should always be given in lowercase or it will never match.
         * Example: ["https"] will match only HTTPS URLs.
         */
        schemes?: string[];
        /**
         * Optional. An array which may contain integers and arrays of integers.
         * Integers are interpreted as port numbers, while arrays of integers are interpreted as port ranges.
         * Matches if the port of the URL matches any port numer or is contained in any ranges.
         * For example: [80, 443, [1000, 1200]] matches all requests on ports 80, 443, and in the range 1000-1200.
         */
        ports?: number[] | Array<Array<number>>;
    }

    /**
     * An object which allows the addition and removal of listeners for a browser event.
     * Browser compatibility: Chrome, Opera
     */
    export interface Event<T extends Function> {
        /**
         * Registers an event listener callback to an event.
         * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
         * The callback parameter should be a function that looks like this:
         * function() {...};
         */
        addListener(callback: T): void;
        /**
         * Returns currently registered rules.
         * @param callback Called with registered rules.
         * The callback parameter should be a function that looks like this:
         * function(array of Rule rules) {...};
         * Parameter rules: Rules that were registered, the optional parameters are filled with values.
         */
        getRules(callback: (rules: Rule[]) => void): void;
        /**
         * Returns currently registered rules.
         * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
         * @param callback Called with registered rules.
         * The callback parameter should be a function that looks like this:
         * function(array of Rule rules) {...};
         * Parameter rules: Rules that were registered, the optional parameters are filled with values.
         */
        getRules(ruleIdentifiers: string[], callback: (rules: Rule[]) => void): void;
        /**
         * @param callback Listener whose registration status shall be tested.
         */
        hasListener(callback: T): boolean;
        /**
         * Unregisters currently registered rules.
         * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
         * @param callback Called when rules were unregistered.
         * If you specify the callback parameter, it should be a function that looks like this:
         * function() {...};
         */
        removeRules(ruleIdentifiers?: string[], callback?: () => void): void;
        /**
         * Unregisters currently registered rules.
         * @param callback Called when rules were unregistered.
         * If you specify the callback parameter, it should be a function that looks like this:
         * function() {...};
         */
        removeRules(callback?: () => void): void;
        /**
         * Registers rules to handle events.
         * @param rules Rules to be registered. These do not replace previously registered rules.
         * @param callback Called with registered rules.
         * If you specify the callback parameter, it should be a function that looks like this:
         * function(array of Rule rules) {...};
         * Parameter rules: Rules that were registered, the optional parameters are filled with values.
         */
        addRules(rules: Rule[], callback?: (rules: Rule[]) => void): void;
        /**
         * Deregisters an event listener callback from an event.
         * @param callback Listener that shall be unregistered.
         * The callback parameter should be a function that looks like this:
         * function() {...};
         */
        removeListener(callback: T): void;
        hasListeners(): boolean;
    }

    /**
     * Description of a declarative rule for handling events.
     * Browser compatibility: Chrome, Opera
     */
    export interface Rule {
        /** Optional. Optional priority of this rule. Defaults to 100.  */
        priority?: number;
        /** List of conditions that can trigger the actions. */
        conditions: any[];
        /** Optional. Optional identifier that allows referencing this rule.  */
        id?: string;
        /** List of actions that are triggered if one of the conditions is fulfilled. */
        actions: any[];
        /**
         * Optional.
         * Since Firefox 28.
         * Tags can be used to annotate rules and perform operations on sets of rules.
         */
        tags?: string[];
    }
}
